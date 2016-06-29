import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more'

injectTapEventPlugin();

const App = () => (
    <MuiThemeProvider>
        <AppBar title="Welcome Express!" iconElementRight={<IconButton><NavigationExpandMore /></IconButton> } />
    </MuiThemeProvider>
);
render(<App />, document.getElementById('app'));