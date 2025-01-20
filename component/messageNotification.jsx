import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import Pusher from 'pusher-js';
import { useCallback, useEffect } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessage } from '../reduxStore/messageslice';

export const MessageNotify = () => {
  const { profiledata } = useSelector((state) => state.userProfile);
  const route = useRoute(); // This gives the current route
  const dispatch = useDispatch();

  // useFocusEffect ensures that notifications are triggered only when the screen is focused
  useFocusEffect(
    useCallback(() => {
      // Only trigger Pusher notifications if we're not on the Chat page and profiledata exists
     if(profiledata){
        const pusher = new Pusher('8f73656210544fae641f', {
          cluster: 'ap2',
        });

        const messageChannel = pusher.subscribe('chat.' + profiledata.data.id);
        messageChannel.bind('GotMessage', function (event) {
          dispatch(fetchMessage());
          if ( route.name !== "Chat") {
          messageNotification(event.sender_id, event.name, event.message);
        }
        });

        // Cleanup when the component is unfocused or route changes
        return () => {
          pusher.unsubscribe('chat.' + profiledata.data.id);
        };
     }
    }, [profiledata, route.name, dispatch]) // Dependencies include profiledata, route.name, and dispatch
  );

  // Function to clear notifications from a particular channel
  const clearChannelNotifications = (channelId) => {
    PushNotification.getDeliveredNotifications((notifications) => {
      // Filter the notifications based on the channel ID
      const notificationsToRemove = notifications.filter(
        (notification) => notification.channelId === channelId
      );

      // Remove each notification from the channel
      notificationsToRemove.forEach((notification) => {
        PushNotification.removeDeliveredNotification(notification.id);
      });
    });
  };

  // Function to send message notifications
  const messageNotification = (channel_id, title, message) => {
    clearChannelNotifications(`message_${channel_id}`);
    if (Platform.OS === 'android') {
      // Create the notification channel (This should be done once, not repeatedly)
      PushNotification.createChannel(
        {
          channelId: 'message_' + channel_id,
          channelName: 'Default Notifications',
          channelDescription: 'A channel for default notifications',
          playSound: true,
          soundName: 'default',
          vibrate: true,
        },
        (created) => console.log(`Channel created: ${created}`)
      );

      // Send the notification
      PushNotification.localNotification({
        channelId: 'message_' + channel_id,
        ticker: 'Notification Ticker',
        autoCancel: true, // Automatically remove the notification after it's tapped
        largeIcon: 'ic_launcher', // Icon for the notification
        smallIcon: 'ic_notification', // Small icon for the notification
        title: title,
        message: message,
        playSound: true,
        soundName: 'default',
        vibrate: true,
        vibration: 100, // Vibration duration in ms
        priority: 'high',
        badge: 1, // Set badge count on app icon
      });
    }
  };

  return null; // No need to render anything here as this is just a side-effect handler
};
