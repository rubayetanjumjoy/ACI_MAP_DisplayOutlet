from django.shortcuts import render
from django.http import request


# Create your views here.
def display_location(request):
    return render(request, 'display_location.html')