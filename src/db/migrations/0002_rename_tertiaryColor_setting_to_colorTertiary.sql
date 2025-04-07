-- Custom SQL migration file, put your code below! --
update goals set settings = replace(settings, '"tertiaryColor":', '"colorTertiary":') where settings like '%tertiaryColor%';
