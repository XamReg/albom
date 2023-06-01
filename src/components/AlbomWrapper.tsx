import { useState } from "react";
import React from "react";
import styles from "../styles/AlbomWrapper.module.scss";
import {pagesForAlbom,photoAlbom, backAlbom} from "../data/data";
import stylePattern from "../styles/styleForPatter.module.scss";
import style from "../styles/stylesPattern.module.css";
import Modal from "./Modal";
import Basket from "./Basket";

const AlbomWrapper = () => {
    interface ITypeForAlbom {
        id: number,
        gall: string,
        pattr: string,
        back: string,
    }


    const[gallery, setGallery] = useState(photoAlbom);
    const[pattern, setPattern] = useState(["1","2","3","4","5"]); 
    const[backG, setBackG] = useState<string[]>(backAlbom);
    const[content,setContent] = useState(gallery);
    const[currentCard, setCurrentCard] = useState<string>("");
    const[pageIndex, setPageIndex] = useState(0);
    const[allContent,setAllContent] = useState<ITypeForAlbom[]>(pagesForAlbom);
    const[offset,setOffSet]= useState<number>(0);
    const[active, setActive] = useState<boolean>(false);
    const[activeBasket, setActiveBacket] = useState<boolean>(false);
    const[photoActive,setPhotoActive] = useState<string>();

    const basketActiv = () => {
        setActiveBacket(() => true)
    }

    const switchPagePlus = () => {
            if (pageIndex > 0 && offset != 0) {
                setOffSet(() => offset +560);
                setPageIndex(() => pageIndex - 1);
            }
    }

    const switchPageMinus = () => {
        if (allContent.length > (pageIndex + 1)) {
            setOffSet(()=> offset -560);
            setPageIndex(() => pageIndex + 1)};
    }

    const switchBlock = (value:string[]) => {
        setContent(() => value)
    }

    const updateScreen = (value:any) => {
        if (content == gallery)
            {
               //т.к используем drag and drop эта часть анм не нужна, но для удоства можно и включить.
                // setPhotoActive(() => value)
                // setActive(() => true)
                // setAllContent(prevState => 
                //     prevState.map(item => 
                //       item.id === pageIndex 
                //         ? { ...item, gall: value }
                //         : item))
            }
        if (content == pattern)
            {
                setAllContent(prevState => 
                    prevState.map(item => 
                      item.id === pageIndex 
                        ? { ...item, pattr: value }
                        : item))
            }
        if (content == backG)
            { 
                setAllContent(prevState => 
                    prevState.map(item => 
                      item.id === pageIndex 
                        ? { ...item, back: value }
                        : item))
            }
    }

    const clearnSlide = () => {
        setAllContent(
            allContent.map(product => {
                if (product.id === pageIndex) {
                  return {
                    ...product,
                    gall: product.gall = "",
                    back: product.back = "",
                    pattr: product.pattr = "",
                  };
                } else {
                  return product;
                }
                }
            )
        )
    }

    const latout = [
        {   title: "Галерея",
            value: gallery},
        {   title: "Шаблон",
            value: pattern},
        {   title: "Фон",
            value: backG}
    ]

    const st1 = [
        stylePattern.wrapper_style1,
        stylePattern.wrapper_style2,
        stylePattern.wrapper_style3,
        stylePattern.wrapper_style4,
        stylePattern.wrapper_style5,
    ]
    let st = st1[Number(allContent[pageIndex].pattr ) - 1 ]


    const dragStartHandler = (e:React.DragEvent, block:string) => {
        setCurrentCard(block)
        e.dataTransfer.setData("",block)

    }
    const dragEndHandler = (e:any) => {

    }
    const dragOverHandler = (e:any) => {
        e.preventDefault()
    }
    const dropHandler = (e: React.DragEvent) => {
        e.preventDefault()
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        updateScreen(currentCard)
        if (content == gallery)
        {
            setAllContent(prevState => 
                prevState.map(item => 
                    item.id === pageIndex 
                    ? { ...item, gall: currentCard }
                    : item))
        }
    }

    const checkPhoto= (block:string) => {
        if (content == gallery) {
            setPhotoActive(() => block)
            setActive(() => true)
        }
    };


    return(
        <div className={styles.wrapper_container}>
            <div className={styles.wrapper_container_mainBlock}>
                <div className={styles.wrapper_container_mainBlock_header}> 
                    <button
                        onClick={() => basketActiv()}
                        className={styles.wrapper_container_mainBlock_header_button}
                        >В корзину</button>
                </div>
                <div 
                    className={styles.wrapper_container_mainBlock_albom}>
                {
                    allContent.map((cont,index) => (
                        <div 
                            key={index}
                            onDrop={(e) => dropHandler(e)}
                            onDragOver={(e) => dragOverHandler(e)}
                            className={styles.wrapper_container_mainBlock_albom_block}
                            style={{transform: `translateX(${offset}px)`}}>
                            <img
                                src={cont.back}
                                className={styles.wrapper_container_mainBlock_albom_block_backAlbom}/>
                            <img 
                                onClick={() => checkPhoto(cont.gall)}
                                src={cont.gall}
                                className={st === undefined ? st1[0]:st}/>
                        </div>
                    ))
                }
                </div>
                <div className={styles.wrapper_container_mainBlock_pages}>
                    <button
                        onClick={() => switchPagePlus()} 
                        className={styles.wrapper_container_mainBlock_pages_buttonSwitch}>
                            <div className={styles.wrapper_container_mainBlock_pages_buttonSwitch_left}/>
                        </button>
                    <h1 className={styles.wrapper_container_mainBlock_pages_text}>Страница {pageIndex + 1}  </h1>
                    <button 
                        onClick={() => switchPageMinus()}
                        className={styles.wrapper_container_mainBlock_pages_buttonSwitch}>
                        <div className={styles.wrapper_container_mainBlock_pages_buttonSwitch_right}/>        
                    </button>
                </div>
                <div className={styles.wrapper_container_mainBlock_layout}>
                    
                    {latout.map((butt,index) => (
                        <button 
                            onClick={() => switchBlock(butt.value)}
                            key={index}
                            className={
                                (content == butt.value) ?
                                styles.wrapper_container_mainBlock_layout_buttonL
                                :
                                styles.wrapper_container_mainBlock_layout_withoutStylesButton
                            }
                            >{butt.title}</button>
                    ))}
                </div>
                <div className={styles.wrapper_container_mainBlock_button}>
                    <button
                        className={styles.wrapper_container_mainBlock_button_clearnButton}

                        onClick={() => clearnSlide()}
                        >
                        <img 
                            src={'./img/cancel.svg'}/> Очистить</button>
                </div>
                <div className={styles.wrapper_container_mainBlock_photo}>
                    {
                        content.map((block,index) => (
                                
                                <img   
                                    onDragStart={(e) => dragStartHandler(e, block)}
                                    onDragLeave={(e) => dragEndHandler(e)}
                                    onDragEnd={(e) => dragEndHandler(e)}
                                    draggable={true}
                                    key={index}
                                    onClick={() => updateScreen(block)}
                                    className={styles.wrapper_container_mainBlock_photo_blockForPhoto}
                                    src={block}
                                    alt={String(index + 1)}
                                ></img>
                        ))
                    }
                </div>
            </div>
            <Modal active={active} setActive={setActive} photo={photoActive}/>
            <Basket active={activeBasket} setActive={setActiveBacket} />
        </div>
        
    )
}

export default AlbomWrapper;