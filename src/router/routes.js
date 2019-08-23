
const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        path: 'contact', component: () => import('pages/Contact.vue')
      },
      {
        path: 'photography', component: () => import('pages/Photography.vue'),
        children: [
          { path: '', component: () => import('components/Columns.vue') },
          { name: "photograph", path: ':id(\\d+)', component: () => import('components/Item.vue') }
        ]
      },
      {
        path: 'reviews', component: () => import('pages/Reviews.vue'),
        children: [
          { path: '', component: () => import('components/Columns.vue') },
          { path: ':id(\\d+)', component: () => import('components/Item.vue') }
        ]
      },
      {
        path: '', component: () => import('pages/Index.vue'),
        children: [
          { name: "page", path: ':id(|\\d+)', component: () => import('components/Resume.vue') }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes