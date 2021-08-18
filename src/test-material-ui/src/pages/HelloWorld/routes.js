import MButton from '../Button/Button';
import MIconButton from '../Button/IconButton'
import MFormControl from '../Form/FormControl'

const routes = [
    {
        path: "/Button",
        key: 'Button',
        group: 'Components',
        exact: true,
        component: MButton
    },
    {
        path: "/IconButton",
        key: 'IconButton',
        group: 'Components',
        exact: true,
        component: MIconButton
    },
    {
        path: "/FormControl",
        key: 'FormControl',
        group: 'Form',
        exact: true,
        component: MFormControl
    },
];

export function toGroup(routes,groupKey) {
    if(!routes) return  [];
    return routes.filter(route=> route.group === groupKey)
}

export default routes
