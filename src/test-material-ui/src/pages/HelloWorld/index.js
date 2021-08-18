import * as React from "react";
import {useParams} from "react-router-dom";
import {
    Link,
    List,
    ListSubheader,
    Typography,
    ListItem,
    Hidden,
    Drawer,
    AppBar,
    Toolbar,
    Divider,
    IconButton
} from "@material-ui/core";
import {makeStyles, useTheme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import { renderRoutes } from "react-router-config";
import routes, {toGroup} from "./routes";

const drawerWidth = 240

const HelloMaterialUI = (props)=>{

    const {tab} = useParams()

    const classes = useStyles()

    const theme = useTheme()

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (<div>
        <Divider />
        <List>
            <ListSubheader component="div" id="nested-list-subheader">
                组件
            </ListSubheader>
            {
                toGroup(routes, 'Components').map((route)=>(
                    <ListItem key={route.key} selected={tab === route.key} component={Link} href={`#${route.path}`}>
                        {route.key}
                    </ListItem>
                ))
            }
        </List>
        <Divider />
        <List >
            <ListSubheader component="div" id="nested-list-subheader">
                响应式
            </ListSubheader>
        </List>
        <Divider />
        <List >
            <ListSubheader component="div" id="nested-list-subheader">
                表单组件
            </ListSubheader>
            {
                toGroup(routes, 'Form').map((route)=>(
                    <ListItem key={route.key} selected={tab === route.key} component={Link} href={`#${route.path}`}>
                        {route.key}
                    </ListItem>
                ))
            }
        </List>
        <Divider/>
        <List >
            <ListSubheader component="div" id="nested-list-subheader">
                库
            </ListSubheader>
        </List>
    </div>)

    const container = window !== undefined ? () => window().document.body : undefined;


    return(
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Test Material-UI
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.nav} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <Toolbar/>
                        {drawerContent}
                    </Drawer>
                </Hidden>
            </nav>
        <main className={classes.main}>
            {renderRoutes(routes)}
        </main>
       </div>
    )
}

const useStyles = makeStyles((theme)=>({
    root: {
        display: 'flex',

    },
    nav: {
        [theme.breakpoints.up('sm')]:{
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    main: {
        flex: 1,
        padding: theme.spacing(3),
        paddingTop: theme.spacing(9)
    }
}))

export default HelloMaterialUI
