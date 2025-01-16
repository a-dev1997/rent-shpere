import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

// Function to remove all notifications (called before sending a new one)
const clearAllNotifications = () => {
  PushNotification.removeAllDeliveredNotifications();
};

// Notification function
export const notification = (channel_id, title, message) => {
  // Clear all notifications before sending the new one
  clearAllNotifications();

  if (Platform.OS === 'android') {
    // Create the notification channel (This should be done once, not repeatedly)
    PushNotification.createChannel(
      {
        channelId: 'channel_' + channel_id,
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
      channelId: 'channel_' + channel_id,
      ticker: "Notification Ticker",
      autoCancel: true, // Automatically remove the notification after it's tapped
      largeIcon: "ic_launcher", // Icon for the notification
      smallIcon: "ic_notification", // Small icon for the notification
      title: title,
      message: message,
      playSound: true,
      soundName: "default",
      vibrate: true,
      vibration: 100, // Vibration duration in ms
      priority: "high",
      badge: 1, // Set badge count on app icon
    });
  }
};
