import React from "react";
import { HashRouter, Switch, Redirect, Route} from 'react-router-dom'

const Router = ()=>(
    <HashRouter>
        <React.Suspense fallback={'加载中。。。'}>
            <Switch>
                <Route path={'/:tab?'} component={React.lazy(()=>import('../pages/HelloWorld/index.js'))}/>
            </Switch>
        </React.Suspense>
    </HashRouter>
)


export default Router;
