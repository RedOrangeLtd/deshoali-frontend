import MainLayout from '@/components/layout/MainLayout.vue'
import HomeView from '@/views/Home/HomeView.vue'
import VideosView from '@/views/Videos/VideosView.vue'
import DocumentsView from '@/views/Documents/DocumentsView.vue'
import TeamDetailsView from '@/views/Team/TeamDetailsView.vue'
import ContactView from '@/views/Contact/ContactView.vue'
export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: 'videos',
        name: 'videos',
        component: VideosView
      },
      {
        path: 'documents',
        name: 'documents',
        component: DocumentsView
      },
      {
        path: 'team-member-details/:name/:id',
        name: 'TeamDetails',
        component: TeamDetailsView
      },
      {
        path: 'contact',
        name: 'Contact',
        component: ContactView
      }
    ]
  }
]
