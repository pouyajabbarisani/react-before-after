/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import './style.scss';

const ReactBeforeAfter = props => {

   const rbaRef = useRef(null);
   const handleRef = useRef(null);
   const beforeRef = useRef(null);
   const afterRef = useRef(null);
   const [imageDimention, setImageDimention] = useState(null);
   const [rbaWidth, setRbaWidth] = useState(null);
   const [isMouseDown, setIsMouseDown] = useState(false);

   useEffect(() => {
      const setBeforeWidth = () => {
         rbaRef.current.querySelector('.rba-before-inset').setAttribute('style', 'width: ' + rbaRef.current.offsetWidth + 'px;');
      }
      setBeforeWidth();
      beforeRef.current.setAttribute('style', 'width: 50%;');
      const touchHandler = (e) => {
         let containerWidth = rbaRef.current.offsetWidth;
         let currentPoint = e.changedTouches[0].clientX;
         let startOfDiv = rbaRef.current.offsetLeft;
         let modifiedCurrentPoint = currentPoint - startOfDiv;
         if (modifiedCurrentPoint > 10 && modifiedCurrentPoint < rbaRef.current.offsetWidth - 10) {
            let newWidth = modifiedCurrentPoint * 100 / containerWidth;
            beforeRef.current.setAttribute('style', 'width:' + newWidth + '%;');
            handleRef.current.setAttribute('style', 'left:' + newWidth + '%;');
         }
      }
      const mouseDownHandler = e => {
         if (rbaRef.current.contains(e.target)) {
            setIsMouseDown(true);
            let containerWidth = rbaRef.current.offsetWidth;
            let currentPoint = e.offsetX;
            let startOfDiv = rbaRef.current.offsetLeft;
            let modifiedCurrentPoint = currentPoint - startOfDiv;
            if (modifiedCurrentPoint > 10 && modifiedCurrentPoint < rbaRef.current.offsetWidth - 10) {
               let newWidth = modifiedCurrentPoint * 100 / containerWidth;
               beforeRef.current.setAttribute('style', 'width:' + newWidth + '%;');
               handleRef.current.setAttribute('style', 'left:' + newWidth + '%;');
            }
         }
      }
      const mouseUpHandler = () => { setIsMouseDown(false) }
      window.addEventListener('resize', setBeforeWidth);
      rbaRef.current.addEventListener('touchstart', touchHandler);
      rbaRef.current.addEventListener('touchmove', touchHandler);
      window.addEventListener('mousedown', mouseDownHandler);
      window.addEventListener('mouseup', mouseUpHandler);
      const setCotnainerWidth = () => { rbaRef?.current?.offsetWidth && setRbaWidth(rbaRef.current.offsetWidth) }
      window.addEventListener('resize', setCotnainerWidth);
      return () => {
         rbaRef.current.removeEventListener('touchstart', touchHandler);
         rbaRef.current.removeEventListener('touchmove', touchHandler);
         window.removeEventListener('resize', setBeforeWidth);
         window.removeEventListener('mousedown', mouseDownHandler)
         window.removeEventListener('mouseup', mouseUpHandler)
         window.removeEventListener('resize', setCotnainerWidth);
      }
   }, []);

   useEffect(() => {
      const mouseMoveHandler = (e) => {
         if (rbaRef.current.contains(e.target)) {
            if (isMouseDown) {
               let containerWidth = rbaRef.current.offsetWidth;
               let currentPoint = e.offsetX;
               let startOfDiv = rbaRef.current.offsetLeft;
               let modifiedCurrentPoint = currentPoint - startOfDiv;
               if (modifiedCurrentPoint > 10 && modifiedCurrentPoint < rbaRef.current.offsetWidth - 10) {
                  let newWidth = modifiedCurrentPoint * 100 / containerWidth;
                  beforeRef.current.setAttribute('style', 'width:' + newWidth + '%;');
                  handleRef.current.setAttribute('style', 'left:' + newWidth + '%;');
               }
            }
         }
      }
      window.addEventListener('mousemove', mouseMoveHandler);
      return () => { window.removeEventListener('mousemove', mouseMoveHandler); }
   }, [isMouseDown]);

   const onImageLoad = (e) => {
      console.log('load')
      setImageDimention({ width: e.target.naturalWidth, height: e.target.naturalHeight });
   }

   const resizeHeight = () => {
      if (rbaRef?.current?.offsetWidth && imageDimention.width) {
         const percentageOfActualyWidth = (rbaRef.current.offsetWidth) * 100 / imageDimention.width;
         rbaRef.current.style['height'] = ((imageDimention.height / 100) * percentageOfActualyWidth) + 'px';
      }
      rbaRef.current.querySelector('.rba-before-inset').setAttribute('style', 'width: ' + rbaRef.current.offsetWidth + 'px;');
   }

   useEffect(() => {
      resizeHeight();
   }, [imageDimention, rbaWidth]);

   return (
      <>
         <div
            className='rba'
            ref={rbaRef}
            style={{ width: `${props.width || (imageDimention?.width || 0)}px`, height: `${props.height || (imageDimention?.height || 0)}px` }}>

            <div className='rba-after' ref={afterRef}>
               <img src={props.afterSrc || ''} alt='after' />
               <div className='rba-afterPosition afterLabel'>
                  {props.afterLabel || 'after'}
               </div>
            </div>

            <div className='rba-before' ref={beforeRef}>
               <div className='rba-before-inset'>
                  <img src={props.beforeSrc} alt='before' onLoad={onImageLoad} />
                  <div className='rba-beforePosition beforeLabel'>
                     {props.beforeLabel || 'Before'}
                  </div>
               </div>
            </div>

            <div className='rba-handle' ref={handleRef}>
               <div className='rba-handle_button'></div>
               <span className='handle-left-arrow'></span>
               <span className='handle-right-arrow'></span>
            </div>

         </div>
      </>
   )
}


export default ReactBeforeAfter;