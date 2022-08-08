

export function fontsizeAdjust($target: Element, $textElements: NodeListOf<Element>,setWidth:boolean=false): any {
    const fontSize = $target == null ? 16 : $target.clientWidth / $textElements.length - 1;

    $target.setAttribute(
        "style",
        "font-size:min(" + Math.floor(fontSize) + "px,90vh)"
    );
    if(setWidth){
        $textElements.forEach((e) => {
            e.setAttribute(
                "style",
                "width:min(" + Math.floor(fontSize) + "px,90vh)"
            );
        });
    }
}


