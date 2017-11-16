import { SET_BREADCRUMB } from '../../mutation-types'

const setBreadcrumbs = ({dispatch,commit},{breadcrumbs}) => {    
    commit(SET_BREADCRUMB, breadcrumbs)
}

export default {
    setBreadcrumbs
}
