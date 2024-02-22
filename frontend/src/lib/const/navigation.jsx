import {
	HiOutlineViewGrid,
	HiPresentationChartBar,
	HiOutlinePencilAlt ,
	HiOutlineCalendar,
	HiOutlineAnnotation,
	HiOutlineLogout,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'projects',
		label: 'Projects',
		path: '/projects',
		icon: <HiPresentationChartBar />
	},
	{
		key: 'tasks',
		label: 'Tasks',
		path: '/tasks',
		icon: <HiOutlinePencilAlt  />
	},
	{
		key: 'calender',
		label: 'Calender',
		path: '/calender',
		icon: <HiOutlineCalendar />
	},
	{
		key: 'messages',
		label: 'Messages',
		path: '/messages',
		icon: <HiOutlineAnnotation />
	},
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	
	{
		key: 'login',
		label: 'Logout',
		path: '/login',
		icon: <HiOutlineLogout  />
	}
]