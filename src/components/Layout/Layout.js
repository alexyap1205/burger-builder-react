import React from 'react';
import Auxillary from '../../hoc/Auxillary';

const layout = (props) => {
  return (
      <Auxillary>
          <div>Toolbar, Side Drawer, Backdrop</div>
          <main>
              {props.children}
          </main>
      </Auxillary>
  );
};

export default layout;