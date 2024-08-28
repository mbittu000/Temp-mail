import { StatusBar } from 'expo-status-bar';
import Router from './Router';
import Main from './context/Main';

export default function App() {
  return (
    <Main>
     <StatusBar style="auto" />
     <Router/>
    </Main>
  );
}

