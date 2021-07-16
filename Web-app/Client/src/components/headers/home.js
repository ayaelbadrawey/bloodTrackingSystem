import {useHistory} from 'react-router-dom'

function HomeHeader() {
  let history = useHistory();
  return (
    <div>
      <h1>Home Header</h1>
    </div>
  );
}

export default HomeHeader;
