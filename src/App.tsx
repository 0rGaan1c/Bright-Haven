import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import { DeleteConfirmationProvider } from "./contexts/DeleteConfirmationContext";
import { TaskProvider } from "./contexts/TaskContext";

function App() {
  return (
    <TaskProvider>
      <DeleteConfirmationProvider>
        <div className="flex flex-col h-screen">
          <Header />
          <Layout />
        </div>
      </DeleteConfirmationProvider>
    </TaskProvider>
  );
}

export default App;
