import React from 'react'
import styles from "./NotFoundBlock.module.scss"
function NoteFoundBlock() {
    console.log(styles)
  return (
    <div className={styles.root}>
<h1>&#129300; <br/> Ничего не найдено... </h1>
</div>
  )
}

export default NoteFoundBlock