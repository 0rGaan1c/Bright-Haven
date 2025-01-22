import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import { useTasks } from "./hooks/useTasks";

function App() {
  const { tasks } = useTasks();
  console.log(tasks);
  return (
    <div className="">
      <Header />
      <Layout />
    </div>
  );
}

export default App;
