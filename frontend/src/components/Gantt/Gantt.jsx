import React, { useEffect, useRef, useCallback } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';

const Gantt = ({ tasks, zoom = 'Days', onDataUpdated }) => {
  const containerRef = useRef(null);
  const initializedRef = useRef(false);
  const dataProcessorRef = useRef(null);

  // Инициализация уровней зума
  const initZoom = useCallback(() => {
    gantt.ext.zoom.init({
      levels: [
        {
          name: 'Hours',
          scale_height: 60,
          min_column_width: 30,
          scales: [
            { unit: 'day', step: 1, format: '%d %M' },
            { unit: 'hour', step: 1, format: '%H' }
          ]
        },
        {
          name: 'Days',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: 'week', step: 1, format: 'Week #%W' },
            { unit: 'day', step: 1, format: '%d %M' }
          ]
        },
        {
          name: 'Months',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: 'month', step: 1, format: '%F' },
            { unit: 'week', step: 1, format: '#%W' }
          ]
        }
      ]
    });
  }, []);

  // Применение зума
  const setZoom = useCallback((level) => {
    if (!gantt.$initialized) {
      initZoom();
    }
    gantt.ext.zoom.setLevel(level);
  }, [initZoom]);

  // Инициализация DataProcessor для отслеживания изменений
  const initDataProcessor = useCallback(() => {
    if (!onDataUpdated) return;

    dataProcessorRef.current = gantt.createDataProcessor(
      async (entityType, action, item, id) => {
        const success = await onDataUpdated(entityType, action, item, id);
        return success ? Promise.resolve() : Promise.reject();
      }
    );
  }, [onDataUpdated]);

  // Очистка DataProcessor
  useEffect(() => {
    return () => {
      if (dataProcessorRef.current) {
        dataProcessorRef.current.destructor();
        dataProcessorRef.current = null;
      }
    };
  }, []);

  // Инициализация Gantt
  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return;

    // Настройка Gantt
    gantt.config.date_format = '%Y-%m-%d %H:%i';
    gantt.config.columns = [
      { name: 'text', label: 'Task Name', tree: true, width: 250 },
      { name: 'start_date', label: 'Start Date', align: 'center', width: 100 },
      { name: 'duration', label: 'Duration', align: 'center', width: 80 },
      { 
        name: 'status', 
        label: 'Status', 
        align: 'center', 
        width: 100,
        template: (task) => task.originalData?.status || 'To Do'
      }
    ];

    // Настройка отображения
    gantt.config.autosize = 'xy';
    gantt.config.readonly = false;
    gantt.config.show_task_cells = true;
    gantt.config.details_on_create = true;
    gantt.config.details_on_dblclick = true;
    gantt.config.websocket_url = null; // Отключение WebSocket

    // Инициализация
    gantt.init(containerRef.current);
    initializedRef.current = true;

    // Инициализация DataProcessor
    initDataProcessor();

    return () => {
      if (gantt.$initialized) {
        gantt.clearAll();
      }
      initializedRef.current = false;
    };
  }, [initDataProcessor]);

  // Загрузка данных при их изменении
  useEffect(() => {
    if (!initializedRef.current || !tasks) return;
    
    if (tasks.data && tasks.data.length > 0) {
      gantt.parse(tasks);
    } else {
      gantt.clearAll();
    }
  }, [tasks]);

  // Применение зума при изменении пропса
  useEffect(() => {
    if (initializedRef.current && zoom) {
      setZoom(zoom);
    }
  }, [zoom, setZoom]);

  return (
    <div
      ref={containerRef}
      className="gantt-container"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default React.memo(Gantt);