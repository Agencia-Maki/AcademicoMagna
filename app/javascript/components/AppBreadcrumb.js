import React from 'react'
import { useLocation, Link } from 'react-router-dom'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react-pro'

const AppBreadcrumb = (props) => {
  const { routes } = props

  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <>
      <h3 className="text-info"> { getRouteName(currentLocation, routes) } </h3>
      <CBreadcrumb className="m-0 ms-2 mb-2">
        <CBreadcrumbItem href="/#/">MAGNA</CBreadcrumbItem>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <li
              className={`breadcrumb-item ${breadcrumb.active ? 'active' : ''}`}
              key={index}
            >
              <Link to={breadcrumb.pathname}>{breadcrumb.name}</Link>
            </li>
          )
        })}
      </CBreadcrumb>
    </>
  )
}

export default React.memo(AppBreadcrumb)