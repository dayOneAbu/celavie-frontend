import MealItem from "./MealItem";
import useMeal from "../../hooks/useMeal";

function Meals() {
  const { meals, isLoading } = useMeal();
  return (
    <>
      {isLoading ? (
        <h1>loading</h1>
      ) : (
        <div className="lg:grid-cols-4 max-w-7xl mx-auto md:grid-cols-2 gap-4 grid-cols-1 grid">
          <MealItem meals={meals} />
        </div>
      )}
    </>
  );
}

export default Meals;
