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
          { name: "review", path: ':id(\\d+[\-a-zA-Z0-9]*)', component: () => import('components/Item.vue') }
        ]
      },
      {
        path: '', component: () => import('pages/Index.vue'),
        children: [
          { name: "page", path: ':id(|\\d+[\-a-zA-Z0-9]*)' }
        ]
      }
    ]
  }
]

// Always leave this as last one
routes.push({
  path: '*',
  component: () => import('pages/Error.vue')
})

export default routes