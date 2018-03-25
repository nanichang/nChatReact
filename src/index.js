import React from 'react';
import ReactDOM from 'react-dom';

import CommentBox from './components/CommentBox';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <CommentBox 
        url='http://localhost:3003/api/comments' 
        pollInterval={2000} />, 
    document.getElementById('root')
);
registerServiceWorker();
