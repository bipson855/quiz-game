import { useEffect, useRef } from 'react';
export default function ExitDialog({ onClose, onLeave }) {
  const dialog = useRef(null);
  useEffect(() => { const element = dialog.current; element.showModal(); return () => element.close(); }, []);
  return <dialog ref={dialog} className="modal" aria-labelledby="exit-title" onCancel={event => { event.preventDefault(); onClose(); }}><h2 id="exit-title">Leave this quiz?</h2><p>Your progress in this round will be lost. The timer continues while you decide.</p><div><button className="secondary" autoFocus onClick={onClose}>Keep playing</button><button className="primary" onClick={onLeave}>Leave quiz</button></div></dialog>;
}
