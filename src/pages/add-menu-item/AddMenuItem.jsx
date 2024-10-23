import useAuthGuard from "../../custom-hooks/useauthguard/useAuthGuard.jsx";
import MainContent
  from "../../components/general-components/maincontent/MainContent.jsx";
import SideBarToggleButton
  from "../../components/general-components/sidebar-toggle-button/SideBarToggleButton.jsx";
import SideBar from "../../components/general-components/sidebar/SideBar.jsx";
import {useContext, useState} from "react";
import MenuItemComplete
  from "../../components/add-menu-item/menu-item-complete/MenuItemComplete.jsx";
import useFetchMeals
  from "../../custom-hooks/api-requests/GET/useFetchMeals.jsx";

import menuBtn from "../../assets/menu-btn.svg"
import AddMenuForm
  from "../../components/add-menu-item/add-menu-form/AddMenuForm.jsx";

function AddMenuItem() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const {meals, error, loading} = useFetchMeals()

  useAuthGuard("/new-menu-item", "ROLE_MANAGER");
  return (
    <>
      <MainContent>
        <AddMenuForm />
      </MainContent>
      <SideBarToggleButton
        openSideBar={openSideBar}
        setOpenSideBar={setOpenSideBar}
        image={menuBtn}
        alt={"menu button"}
        className={"profile-variant"}

        />
      <SideBar
        className={"sidebar-big"}
        openSideBar={openSideBar}
      >
        {loading ? <h1>Loading...</h1> : error ? <h1>{error}</h1> : (
          meals && meals.length > 0 ? (
              meals.map((meal) => (
                <MenuItemComplete
                  key={meal.id}
                  price={meal.price}
                  description={meal.description}
                  ingredients={meal.ingredients}
                  name={meal.name}

                />
              ))
            ) :
            (
              <h1>No meals found</h1>
            )

        )}
      </SideBar>
    </>
  )
}

export default AddMenuItem;