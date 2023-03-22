import React, { useState, useEffect, useRef } from 'react';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrash,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { RecipeSearchAndSelect } from '../../../components';
import './plannerModal.scss';

function PlannerModal({ dateToShow, onClose, menu }) {
  const ref = useRef();

  const [show, setShow] = useState(false);

  const [indexInput, setIndexInput] = useState(0);

  const [singleMeal, setSingleMeal] = useState();

  const [selectedRecipe, setSelectedRecipe] = useState({});

  const [dailyMenu, setDailyMenu] = useState(menu);

  const [meals, setMeals] = useState([
    { id: 1, text: 'breakfast', isShow: false },
    { id: 2, text: 'lunch', isShow: false },
    { id: 3, text: 'dinner', isShow: false },
  ]);

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

  useEffect(() => {
    if (!singleMeal) {
      return;
    }
    const currentDailyMenu = dailyMenu;
    currentDailyMenu[singleMeal] = selectedRecipe;
    setDailyMenu({ ...currentDailyMenu });
  }, [selectedRecipe]);

  const sendData = (data) => {
    setSelectedRecipe(data);
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

  const onDelete = (text) => {
    const selectedMeal = dailyMenu;
    selectedMeal[text] = {};
    setDailyMenu({ ...selectedMeal });
  };
  return (
    <div className="planner-modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={() => onClose(dailyMenu)}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <h2 className="date">{dateToShow}</h2>
          <div>
            {meals.map(({ text, isShow }, index) => (
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
                    {text.charAt(0).toUpperCase() + text.slice(1)}
                  </button>
                  {dailyMenu[text].title && (
                    <h3 className="recipe-title" key={index}>
                      {dailyMenu[text].title}
                    </h3>
                  )}
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
                          onClick={() => onEdit(index, text)}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button className="btn" onClick={() => onDelete(text)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </span>
                    </div>
                    {dailyMenu[text].title && (
                      <p className="recipe-details">
                        {dailyMenu[text].image && (
                          <img
                            className="recipe-img"
                            alt={dailyMenu[text].title}
                            src={dailyMenu[text].image}
                          />
                        )}
                        {dailyMenu[text].instructions ? (
                          parse(dailyMenu[text].instructions)
                        ) : (
                          <p>No available instructions</p>
                        )}
                      </p>
                    )}
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
