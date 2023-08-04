/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';

// calendar lib
import FullCalendar from '@fullcalendar/react';
// calendar lib plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import PlannerModal from './plannerModal/PlannerModal';
import { Header } from '../../components';
import './menuPlanner.scss';
import { fetchMonthlyRecipes } from '../../services/menuPlannerService';

const dayjs = require('dayjs');

function MenuPlanner() {
  const [isOpen, setIsOpen] = useState(false);

  const [dateToShow, setDateToShow] = useState(new Date());

  const [currentDailyMeals, setCurrentDailyMeals] = useState([]);

  const [menus, setMenus] = useState([]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'breakfast: Bacon Caramels',
      date: '2022-05-07',
    }]);

  const editEvent = (info) => {
    const clickedEvent = info.event;
    // eslint-disable-next-line dot-notation
    console.log(clickedEvent['_def']);
  };

  const handleDateClick = (info) => {
    setIsOpen(true);
    const selectedDate = dayjs(info.date).format('YYYY-MM-DD');

    const dateStringFormat = dayjs(info.date).format('MMMM D, YYYY');

    setDateToShow(dateStringFormat);

    const dailyMeals = menus.filter((meal) => meal.date === selectedDate);

    setCurrentDailyMeals([...dailyMeals]);
  };

  const modifyEvents = ({ meals, mealsForTheDay = [], isInitialMeals = false, selectedDate = '' }) => {
    const currentEvents = [...events];
    for (let i = 0; i < currentEvents.length; i++) {
      const event = currentEvents[i];
      if (event.date === selectedDate) {
        currentEvents.splice(i, 1);
        i--;
      }
    }
    if (isInitialMeals) {
      for (let i = 0; i < meals.length; i++) {
        for (const [key, value] of Object.entries(meals[i])) {
          if (key === 'recipe' && Object.keys(value).length !== 0) {
            const eventToPush = {
              id: value.id,
              title: `${meals[i].mealType} : ${value.title}`,
              date: meals[i].date,
            };
            currentEvents.push(eventToPush);
          }
        }
      }
      setEvents([...currentEvents]);
      return;
    }
    for (let i = 0; i < mealsForTheDay.length; i++) {
      for (const [key, value] of Object.entries(mealsForTheDay[i])) {
        if (key === 'recipe' && Object.keys(value).length !== 0) {
          const eventToPush = {
            id: value.id,
            title: `${mealsForTheDay[i].mealType} : ${value.title}`,
            date: mealsForTheDay[i].date,
          };
          currentEvents.push(eventToPush);
        }
      }
    }

    setEvents([...currentEvents]);
  };

  useEffect(() => {
    fetchMonthlyRecipes()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((res) => {
        setMenus(res);
        modifyEvents({ meals: res, isInitialMeals: true });
      })
      .catch((error) => console.log(error.message));
  }, []);

  const onClose = (mealsForTheDay, selectedDate) => {
    setIsOpen(false);
    const currentMenus = [...menus]; // meals for the month
    for (let i = 0; i < currentMenus.length; i++) {
      const menu = currentMenus[i];
      if (menu.date === selectedDate) {
        currentMenus.splice(i, 1);
        i--;
      }
    }
    for (let i = 0; i < mealsForTheDay.length; i++) {
      for (const [key, value] of Object.entries(mealsForTheDay[i])) {
        if (key === 'recipe' && Object.keys(value).length !== 0) {
          currentMenus.push(mealsForTheDay[i]);
        }
      }
    }
    setMenus([...currentMenus]);
    modifyEvents({ mealsForTheDay, selectedDate });
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <div data-testid="calendar">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            eventColor="purple"
            eventTimeFormat={{
              hour: 'numeric',
              minute: '2-digit',
              meridiem: 'short',
            }}
            events={events}
            eventClick={editEvent}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,dayGridDay,listWeek',
            }}
            aspectRatio={1}
            height={600}
          />
        </div>
      </div>
      {isOpen
        && (
          <PlannerModal
            onClose={onClose}
            dateToShow={dateToShow}
            dailyMeals={currentDailyMeals}
            events={events}
          />
        )}
    </>
  );
}

export default MenuPlanner;
