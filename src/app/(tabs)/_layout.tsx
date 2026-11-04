import { Tabs } from 'expo-router';

import { TabBar } from '@/components/navigation/tab-bar';
import { Icon } from '@/components/ui';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="planning"
        options={{
          title: 'Planning',
          tabBarIcon: ({ color }) => <Icon name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="trajet"
        options={{
          title: 'Trajet',
          tabBarIcon: ({ color }) => <Icon name="navigation" color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          // TODO(messages): replace with the real unread count
          tabBarBadge: 2,
          tabBarIcon: ({ color }) => <Icon name="message-square" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{ title: 'Profil', tabBarIcon: ({ color }) => <Icon name="user" color={color} /> }}
      />
    </Tabs>
  );
}
