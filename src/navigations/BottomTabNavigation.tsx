import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '../types/types';
import HomeScreen from '../screens/Home/HomeScreen';
import {TabIcon} from '../components/TabIcon';
import CommunityScreen from '../screens/CommunityScreen/CommunityScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import AlertScreen from '../screens/Alert/AlertScreen';
import MyPageScreen from '../screens/MyPage/MyPageScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const renderTabIcon = (iconName: string, color: string) => (
  <TabIcon iconName={iconName} visibleBadge={false} iconColor={color} />
);

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1380FF',
        tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => renderTabIcon('home', color),
        }}
      />
      <BottomTab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({color}) =>
            renderTabIcon('chatbox-ellipses-outline', color),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => renderTabIcon('map-outline', color),
        }}
      />
      <BottomTab.Screen
        name="Alert"
        component={AlertScreen}
        options={{
          tabBarLabel: 'Alert',
          tabBarIcon: ({color}) =>
            renderTabIcon('notifications-outline', color),
        }}
      />
      <BottomTab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          tabBarLabel: 'MyPage',
          tabBarIcon: ({color}) => renderTabIcon('reorder-three', color),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
