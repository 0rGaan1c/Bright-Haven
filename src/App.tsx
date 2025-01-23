import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import { TaskProvider } from "./contexts/TaskContext";

function App() {
  return (
    <TaskProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <Layout />
      </div>
    </TaskProvider>
  );
}

export default App;
