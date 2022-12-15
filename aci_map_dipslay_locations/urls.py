
from django.urls import path, include
from . import views
from .apis import get_address
urlpatterns = [
    path('', views.display_location,name='displaylocation'),
    path('getaddress/', get_address.as_view(),name='displaylocation'),

    # path('script/', ScriptgView.as_view()),

]