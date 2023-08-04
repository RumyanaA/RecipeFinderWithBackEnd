/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrash,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { ErrorMessage, RecipeSearchAndSelect } from '../../../components';
import './plannerModal.scss';
import { deleteMeal, setMeal } from '../../../services/menuPlannerService';

const dayjs = require('dayjs');

function PlannerModal({ dateToShow, onClose, dailyMeals }) {
  const ref = useRef();

  const [show, setShow] = useState(false);

  const [indexInput, setIndexInput] = useState(0);

  const [singleMeal, setSingleMeal] = useState('');

  const [dailyMenu, setDailyMenu] = useState(dailyMeals);

  const [errorMessage, setErrorMessage] = useState('');

  const [meals, setMeals] = useState([
    { id: 1, mealType: 'breakfast', isShow: false },
    { id: 2, mealType: 'lunch', isShow: false },
    { id: 3, mealType: 'dinner', isShow: false },
  ]);

  const selectedDate = dayjs(dateToShow).format('YYYY-MM-DD');

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if ((show && ref.current && !ref.current.contains(e.target))
      || e.target.className === 'input-buttons-container') {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [show]);

  const sendData = (data) => {
    const userId = JSON.parse(localStorage.getItem('user'))?.id;

    const index = dailyMenu.findIndex((currentMeal) => currentMeal.mealType === singleMeal.toUpperCase());

    const mealDTO = {
      id: index !== -1 ? dailyMenu[index].id : null,
      date: selectedDate,
      externalRecipeId: null,
      recipe: null,
      user: {
        id: userId,
      },
      mealType: singleMeal.toUpperCase(),
    };
    if (data.external) {
      mealDTO.externalRecipeId = data.id;
    } else {
      mealDTO.recipe = {
        id: data.id,
      };
    }
    setMeal(mealDTO)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((res) => {
        const currentMealsForTheDay = [...dailyMenu];
        if (index !== -1) currentMealsForTheDay.splice(index, 1);
        currentMealsForTheDay.push(res[0]);
        setDailyMenu([...currentMealsForTheDay]);
        if (errorMessage) setErrorMessage('');
      })
      .catch((error) => setErrorMessage(error.message));
  };

  const toggle = (index) => {
    meals[index].isShow = !meals[index].isShow;
    setMeals([...meals]);
  };

  const onEdit = (ind, meal) => {
    setSingleMeal(meal);
    if (indexInput === ind) {
      setShow(!show);
    } else {
      setIndexInput(ind);
    }
  };

  const onDelete = (mealType) => {
    const currentDailyMeals = [...dailyMenu];

    const index = dailyMenu.findIndex((currentMeal) => currentMeal.mealType === mealType.toUpperCase());

    const mealId = dailyMenu[index]?.id;
    try {
      deleteMeal(mealId)
        .then((response) => {
          if (response.ok) {
            currentDailyMeals.splice(index, 1);
            setDailyMenu([...currentDailyMeals]);
            if (errorMessage) setErrorMessage('');
            return response.json();
          }
          throw new Error('Something went wrong');
        });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <div className="planner-modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={() => onClose(dailyMenu, selectedDate)}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <h2 className="date">{dateToShow}</h2>
          <ErrorMessage message={errorMessage} />
          <div>
            {meals.map(({ mealType, isShow }, index) => (
              <div key={index} className="item">
                <div
                  className="arrow-buttons-container"
                  onClick={() => toggle(index)}
                >
                  <button className="arrow-buttons">
                    {isShow ? (
                      <FontAwesomeIcon
                        className="arrow-icon"
                        icon={faCaretUp}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="arrow-icon"
                        icon={faCaretDown}
                      />
                    )}
                    {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                  </button>
                  {dailyMenu?.map((currentMeal) => (currentMeal.mealType === mealType.toUpperCase()
                    ? (
                      <h3 className="recipe-title" key={index}>
                        {currentMeal.recipe.title}
                      </h3>
                    )
                    : null))}
                </div>

                {isShow && (
                  <div className="recipe">
                    <div className="input-buttons-container" ref={ref}>
                      {show && indexInput === index ? (
                        <RecipeSearchAndSelect
                          sendData={sendData}
                        />
                      ) : null}
                      <span className="buttons-container">
                        <button
                          className="btn"
                          onClick={() => onEdit(index, mealType)}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button className="btn" onClick={() => onDelete(mealType)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </span>
                    </div>
                    {dailyMenu?.map((currentMeal, ind) => (
                      currentMeal.mealType === mealType.toUpperCase()
                        ? (
                          <p key={`${ind}${currentMeal.recipe.title}`} className="recipe-details">
                            {currentMeal.recipe.image && (
                            <img
                              className="recipe-img"
                              alt={currentMeal.recipe.title}
                              src={currentMeal.recipe.image}
                            />
                            )}
                            {currentMeal.recipe.instructions ? (
                              parse(currentMeal.recipe.instructions)
                            ) : (
                              <p>No available instructions</p>
                            )}
                          </p>
                        )
                        : null))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlannerModal;
