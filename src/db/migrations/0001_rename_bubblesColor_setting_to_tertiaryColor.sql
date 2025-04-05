-- Custom SQL migration file, put your code below! --
update goals set settings = replace(settings, '"bubblesColor":"#808080",', '') where settings like '%"bubblesColor":"#808080",%' and type != 'opposite';
update goals set settings = replace(settings, '"bubblesColor":"#808080"', '') where settings like '%"bubblesColor":"#808080"%' and type != 'opposite';
update goals set settings = replace(settings, '"bubblesColor":', '"tertiaryColor":') where settings like '%bubblesColor%';
