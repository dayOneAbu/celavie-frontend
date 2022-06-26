import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { MdAdd, MdList } from "react-icons/md";
import { AppButton } from "../../components";
function MenuEditor() {
  let navigate = useNavigate();
  return (
    <>
      <div className="flex items-center py-10 px-12 justify-evenly">
        <AppButton className={"w-52"} onClick={() => navigate("new")}>
          <MdAdd className="text-white w-10 h-10" /> add new meal
        </AppButton>
        <AppButton className={"w-52"} onClick={() => navigate("all")}>
          <MdList className="text-white w-10 h-10" /> view Meals
        </AppButton>
      </div>
      <Outlet />
    </>
  );
}
export default MenuEditor;
