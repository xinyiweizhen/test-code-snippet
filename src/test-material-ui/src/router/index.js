import React from "react";
import { HashRouter, Switch, Redirect, Route} from 'react-router-dom'

const router = ()=>(
    <HashRouter>
        <React.Suspense fallback={'加载中。。。'}>
            <Switch>
                {/*<Redirect to={'/Hello'} />*/}
                <Route exact path={'/Hello'} component={React.lazy(()=>import('../pages/HelloWorld/index.js'))}/>
            </Switch>
        </React.Suspense>
    </HashRouter>
)


export default router;
