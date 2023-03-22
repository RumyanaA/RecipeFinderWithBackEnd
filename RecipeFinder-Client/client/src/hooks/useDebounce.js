import { useRef, useEffect } from 'react';

const ONE_SECOND = 1000;

export default ({ debouncedValue, fnCall }) => {
  const timeout = useRef();

  useEffect(() => {
    timeout.current = setTimeout(() => fnCall(debouncedValue), ONE_SECOND);
  }, [debouncedValue]);
};
