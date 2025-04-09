-- Custom SQL migration file, put your code below! --
update goals set settings = replace(settings, '"delay":', '"timer":') where settings like '%"delay":%';
