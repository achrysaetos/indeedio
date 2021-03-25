import React, { useState, useEffect } from "react"
import { useMutation } from "@apollo/react-hooks"
import { AddIcon, MinusIcon } from "@chakra-ui/icons"

import { CREATE_FAV } from "../../graphql/CREATE_FAV"
import { DELETE_FAV } from "../../graphql/DELETE_FAV"

export default function FavBtn({ user, favs, info: { company, title, link, location, posted } }) {
  const [fav, setFav] = useState(false) 
  
  useEffect(() => { 
    if (user && favs.find((f) => f.link === link)) {
      setFav(true)
    } else {
      setFav(false)
    }
  }, [favs, link, user])

  const [addFav] = useMutation(CREATE_FAV, { 
    update(){
      setFav(true)
    },
    variables: { userId: user.id, company: company, title: title, link: link, location: location, posted: posted } 
  })

  const favId = favs.find((f) => f.link === link)?.id
  const [delFav] = useMutation(DELETE_FAV, { 
    update(){
      setFav(false)
    },
    variables: { userId: user.id, favId: favId } 
  })

  const favButton = (
    fav ? (
      <MinusIcon _hover={{ color: "teal.500" }} mr={3} onClick={delFav} />
    ) : (
      <AddIcon _hover={{ color: "teal.500" }} mr={3} onClick={addFav} />
    )
  )

  return favButton
  
}
