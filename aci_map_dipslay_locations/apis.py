import requests
from rest_framework.views import APIView
from rest_framework.response import Response
class get_address(APIView):
    def get(self, request):
        list=[{
            "id": 503396,
            "name": "Secondary Transfer Station (Sts)",
            
            "longitude": 90.35175293684,
            "latitude": 23.760265886903,
            "Address": "Mohammadpur Beribadh Road",
             
        }]
        return Response(list)