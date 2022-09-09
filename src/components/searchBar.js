import { React, useEffect, useState } from 'react';
import axios from 'axios';

return (
    <div>
      <input 
          type='search' 
          id='cityEntry'
          onChange={handleSearchBarChange}
      ></input>
      <button onClick={handleClick}>enter city</button>
      <> | </>
      <>{responseCurrentLocation}</>
      <> | </>
      <>{responseWeather}</>
      <> | </>
      <>{convertedTime}</>
      <> | </>
      <>{convertedTemperature}</>
    </div>
  );