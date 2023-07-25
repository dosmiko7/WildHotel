import { useEffect, useRef } from "react";

// listenCapturing lets user to decide whether they want to listen for the event
// listenCapturing = true - capturing phase
// listenCapturing = false - bubbling phase
export const useOutsideClick = (handler, listenCapturing = true) => {
	const ref = useRef();

	useEffect(() => {
		const handleClick = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				handler();
			}
		};

		document.addEventListener("click", handleClick, listenCapturing);

		return () => document.removeEventListener("click", handleClick, listenCapturing);
	}, [handler, listenCapturing]);

	return ref;
};
