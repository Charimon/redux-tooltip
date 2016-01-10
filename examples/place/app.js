import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Origin } from '../../src/index';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Place Example</h1>

        <h2>Using origin's prop</h2>
        <p>
          Available 4 directions: <Origin className="target" place="top">Top</Origin>, <Origin className="target" place="right">Right</Origin>, <Origin className="target" place="bottom">Bottom</Origin>, and <Origin className="target" place="left">Left</Origin>.
        </p>

        <Tooltip>
          This is a <b>shared</b> tooltip.
        </Tooltip>

        <h2>Using tooltip's prop</h2>
        <p>
          Available 4 directions: <Origin className="target" name="top">Top</Origin>, <Origin className="target" name="right">Right</Origin>, <Origin className="target" name="bottom">Bottom</Origin>, and <Origin className="target" name="left">Left</Origin>.
        </p>

        <Tooltip name="top" place="top">
          This is a <b>top</b> tooltip.
        </Tooltip>
        <Tooltip name="right" place="right">
          This is a <b>right</b> tooltip.
        </Tooltip>
        <Tooltip name="bottom" place="bottom">
          This is a <b>bottom</b> tooltip.
        </Tooltip>
        <Tooltip name="left" place="left">
          This is a <b>left</b> tooltip.
        </Tooltip>

        <h2>Auto placement</h2>
        <p>
          <Origin className="target auto-basic" place="left">This tooltip</Origin> is configured to be placed <b>left</b> of the origin element, but no space to show.<br />
          Therefore, it will be located <b>right</b> instead of <b>left</b>.
        </p>

        <p>
          You can customize <Origin className="target auto-array" place={['left', 'top']}>the order</Origin> of fallback.<br />
          The 'place' prop <Origin className="target auto-string" place="left,bottom">can</Origin> be also passed as a comma separated string.
        </p>

        <div style={{ width: '320px', height: '160px', backgroundColor: 'lightgray', padding: '10px', position: 'relative' }}>
          In default, <Origin className="target auto-top" place="top">redux-tooltip</Origin> supposes you want to do auto-placement within the browser window.<br />
          Using 'within' prop, you can specify <Origin className="target auto-right" place="right">DOM</Origin> element instead of BODY element.
          <div style={{ position: 'absolute', bottom: '10px' }}>
            This is a <Origin className="target auto-bottom" place="bottom">bottom</Origin> origin.
          </div>
        </div>

        <div style={{ width: '308px', backgroundColor: 'lightgray', marginTop: '14px', padding: '16px' }}>
          <Origin className="target auto-more" place={['left', 'top', 'bottom', 'right']}>Two or more</Origin> fallbacks also works well.
        </div>
      </div>
    );
  }
}

function select(state) {
  const { app } = state;
  return { app };
}

export default connect(select)(App);
