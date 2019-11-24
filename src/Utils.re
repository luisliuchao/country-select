open Webapi.Dom;

let getElementById: string => option(Dom.htmlElement) = (id) => {
  let element = document |> Document.getElementById(id);
  switch (element) {
  | None => None
  | Some(element) => Element.asHtmlElement(element)
  }
};
