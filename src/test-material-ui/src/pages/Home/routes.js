import MButton from '../Button/Button';
import MIconButton from '../Button/IconButton';
import MFormControl from '../Form/FormControl';
import MHidden from "../Responsive/Hidden";
import BasicBar from "../ChartJs/BasicBar";
import StackedBar from '../ChartJs/StackedBar'
import BasicLine from "../ChartJs/BasicLine";
import DoughnutChart from "../ChartJs/Doughnut";
import PieChart from "../ChartJs/Pie";
import PolarAreaChart from "../ChartJs/PolarArea";

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
    {
        path: "/Hidden",
        key: 'Hidden',
        group: 'Responsive',
        exact: true,
        component: MHidden
    },
    {
        path: "/BasicBar",
        key: 'BasicBar',
        group: 'Charts',
        exact: true,
        component: BasicBar
    },
    {
        path: "/StackedBar",
        key: 'StackedBar',
        group: 'Charts',
        exact: true,
        component: StackedBar
    },
    {
        path: "/BasicLine",
        key: 'BasicLine',
        group: 'Charts',
        exact: true,
        component: BasicLine
    },
    {
        path: "/Doughnut",
        key: 'Doughnut',
        group: 'Charts',
        exact: true,
        component: DoughnutChart
    },
    {
        path: "/Pie",
        key: 'Pie',
        group: 'Charts',
        exact: true,
        component: PieChart
    },
    {
        path: "/PolarArea",
        key: 'Polar Area',
        group: 'Charts',
        exact: true,
        component: PolarAreaChart
    },
];

export function toGroup(routes,groupKey) {
    if(!routes) return  [];
    return routes.filter(route=> route.group === groupKey)
}

export default routes
