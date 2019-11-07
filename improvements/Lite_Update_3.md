# Frontend Control Unit - Improvement 1

## Codenamed:&nbsp;Async-due-to-Dynamic RemoveCurrentView&nbsp;:zap:

##
## Version:&nbsp;GA R2U Lite Update 3
## Status:&nbsp;UAD&nbsp;[ Under Consideration ]&nbsp;:zap:
## Streamlined:&nbsp;NO
## Description:
 - This is an improvement over FCU 1.0 !
 - ~~FCU 1.1 will be automatically responding to current internet connection speed and will be reconfiguring itself appropriately !~~
 - ~~{x}G stands for 2G, Slow 3G, Fast 3G and 4G following some predefined standards !~~
 - ~~This improvement is a plug-in plug-out functionality, i.e. implemented as a standalone library.~~
 - Current version of RemoveCurrentView works in a so-called Sync-due-to-Static fashion. The next partial view's "rollback option" relies on the current partial view's event handler binder being in place! This requires the current partial view being loaded before the next partial view.
 - Lite Update 3 will introduce asynchrony in this context.
 - Since Lite Update 3 RemoveCurrentView will work in a so-called Async-due-to-Dynamic fashion. The next partial view's "rollback option" won't have to rely on the current partial view's event handler binder being in place when the next partial view is being loaded ! This will enable partial views being loaded in any order !
 - On invoking RemoveCurrentView the previous partial view's event handler binder will be detected in a dynamic way, hence such codename "Async-due-to-Dynamic".
## GA Release: 2020-07-15 Local Time &nbsp;:pushpin:
## License:&nbsp;:free:&nbsp;:heavy_check_mark:
##
#
##### [Go to README.md](/README.md "Repo landing page")
