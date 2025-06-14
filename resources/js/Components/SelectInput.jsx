import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function SelectInput(
    { className = '', isFocused = false, children, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <select
            {...props}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-rose-500 dark:focus:ring-rose-500 ' +
                className
            }
            ref={localRef}
        >
            {children}
        </select>
    );
});
