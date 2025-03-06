import { useEffect, useState, useRef } from 'react';

const Timer = ({ min, sec, id }) => {
    // Изначальное время в секундах из пропсов
    const totalSeconds = Number(min) * 60 + Number(sec);

    // Пытаемся загрузить сохранённое состояние таймера из localStorage
    const savedTimer = localStorage.getItem(`timer-${id}`);
    let initialState = {
        isActive: false,
        deadline: null,
        remaining: totalSeconds,
    };

    if (savedTimer) {
        try {
            const parsed = JSON.parse(savedTimer);
            if (parsed.isActive && parsed.deadline) {
                // Если таймер был запущен, пересчитываем оставшееся время
                const remainingSec = Math.ceil((parsed.deadline - Date.now()) / 1000);
                if (remainingSec > 0) {
                    initialState = { isActive: true, deadline: parsed.deadline, remaining: remainingSec };
                } else {
                    // Если время вышло
                    initialState = { isActive: false, deadline: null, remaining: 0 };
                }
            } else if (!parsed.isActive && parsed.remaining != null) {
                // Если таймер на паузе
                initialState = { isActive: false, deadline: null, remaining: parsed.remaining };
            }
        } catch (error) {
            console.error('Ошибка чтения таймера из localStorage', error);
        }
    }

    const [isActive, setIsActive] = useState(initialState.isActive);
    const [deadline, setDeadline] = useState(initialState.deadline);
    const [remaining, setRemaining] = useState(initialState.remaining);

    const intervalRef = useRef(null);

    // Сохраняем текущее состояние таймера в localStorage при изменениях
    useEffect(() => {
        const timerData = {
            isActive,
            deadline,
            remaining,
        };
        localStorage.setItem(`timer-${id}`, JSON.stringify(timerData));
    }, [isActive, deadline, remaining, id]);

    // Обновление оставшегося времени, если таймер активен
    useEffect(() => {
        if (isActive && deadline) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                const newRemaining = Math.ceil((deadline - Date.now()) / 1000);
                if (newRemaining <= 0) {
                    // Если время вышло, останавливаем таймер
                    setIsActive(false);
                    setDeadline(null);
                    setRemaining(0);
                    clearInterval(intervalRef.current);
                } else {
                    setRemaining(newRemaining);
                }
            }, 1000);
            return () => clearInterval(intervalRef.current);
        }
    }, [isActive, deadline]);

    // Функция запуска таймера: вычисляем новый deadline и переводим в режим "работает"
    const handleStart = () => {
        if (!isActive && remaining > 0) {
            const newDeadline = Date.now() + remaining * 1000;
            setDeadline(newDeadline);
            setIsActive(true);
        }
    };

    // Функция паузы: вычисляем оставшееся время, переводим таймер в режим "на паузе"
    const handlePause = () => {
        if (isActive) {
            const newRemaining = Math.ceil((deadline - Date.now()) / 1000);
            setRemaining(newRemaining);
            setIsActive(false);
            setDeadline(null);
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    };

    // Форматирование оставшегося времени для отображения
    const displayMinutes = Math.floor(remaining / 60);
    const displaySeconds = remaining % 60;

    return (
        <div className="timer">
            {isActive ? (
                <button className="icon icon-pause" onClick={handlePause}></button>
            ) : (
                <button className="icon icon-play" onClick={handleStart}></button>
            )}
            <span className="time">
                {String(displayMinutes).padStart(2, '0')}:{String(displaySeconds).padStart(2, '0')}
            </span>
        </div>
    );
};

export default Timer;
