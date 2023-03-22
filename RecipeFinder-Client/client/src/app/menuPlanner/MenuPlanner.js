/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';

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

const dayjs = require('dayjs');

function MenuPlanner() {
  const [isOpen, setIsOpen] = useState(false);

  const [dateToShow, setDateToShow] = useState(new Date());

  const [currentMenu, setcurrentMenu] = useState({});

  const [menus, setMenus] = useState([
    {
      date: '2022-05-07',
      breakfast: { title: 'Bacon Caramels', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec con' },
      lunch: {},
      dinner: {},
    },
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'breakfast: Bacon Caramels',
      date: '2022-05-07',
    }]);

  const editEvent = (/* info */) => {
    // const clickedEvent = info.event;
    // console.log(clickedEvent['_def']);
  };

  const handleDateClick = (info) => {
    setIsOpen(true);
    const selectedDate = dayjs(info.date).format('YYYY-MM-DD');

    const dateStringFormat = dayjs(info.date).format('MMMM D, YYYY');

    setDateToShow(dateStringFormat);

    let menu = menus.find((meal) => meal.date === selectedDate);
    if (!menu) {
      menu = {
        date: selectedDate,
        breakfast: {},
        lunch: {},
        dinner: {},
      };
    }
    setcurrentMenu(menu);
  };

  const modifyEvents = (meals) => {
    const currentEvents = events;
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (event.date === meals.date) {
        currentEvents.splice(i, 1);
        i--;
      }
    }
    for (const [key, value] of Object.entries(meals)) {
      if (key !== 'date' && Object.keys(value).length !== 0) {
        const eventToPush = {
          id: value.id,
          title: `${key} : ${value.title}`,
          date: meals.date,
        };
        currentEvents.push(eventToPush);
      }
    }
    setEvents([...currentEvents]);
  };

  const onClose = (meals, deletedMealsIds) => {
    setIsOpen(false);
    const currentMenus = menus;

    const menuItemIndex = menus.findIndex((meal) => meal.date === meals.date);
    if (menuItemIndex === -1) {
      currentMenus.push(meals);
    } else {
      currentMenus[menuItemIndex] = meals;
    }
    setMenus([...currentMenus]);
    modifyEvents(meals, deletedMealsIds);
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
            menu={currentMenu}
            events={events}
          />
        )}
    </>
  );
}

export default MenuPlanner;
