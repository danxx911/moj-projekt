import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Todo from "./components/Todo";
import "./App.css";
import Users from "./components/Users";

function App() {
  const cards = [
    {
      id: 1,
      title: "React",
      description: "Ucim se React",
    },
    {
      id: 2,
      title: "JavaScript",
      description: "Znam JavaScript",
    },
    {
      id: 3,
      title: "CSS",
      description: "Ucim se CSS",
    },
  ];

  return (
    <>
      <Header />

      <main className="container">
        <section className="hero">
          <p className="eyebrow">MY WORKSPACE</p>
          <h1>
            My Dashboard<span>.</span>
          </h1>
          <p>Manage your tasks and track your learning.</p>
        </section>

        <section className="cards" id="features">
          {cards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </section>

        <section className="todo-section" id="tasks">
          <h2>My tasks</h2>
          <Todo />
        </section>

        <Users />
      </main>

      <Footer />
    </>
  );
}

export default App;
