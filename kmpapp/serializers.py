from rest_framework import serializers
from .models import Bookmark, Tag


class BookmarkSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Tag.objects.all(),
        required=False,
        allow_empty=False,
        style={"base_template": "select_multiple.html"},
    )

    class Meta:
        model = Bookmark
        fields = ['id', 'title', 'url', 'tags', 'user', 'created_at']
        read_only_fields = ['user', 'created_at']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get("request")

        if request is not None and request.user.is_authenticated:
            self.fields["tags"].queryset = Tag.objects.filter(
                user=request.user
            ).order_by("name")

        print("REQUEST USER:", self.context.get("request"))
        print("AUTH USER:", self.context["request"].user)

        qs = Tag.objects.filter(user=request.user)
        print("TAG COUNT:", qs.count())

    def validate_tags(self, value):
        request = self.context.get("request")
        if request is None or not request.user.is_authenticated:
            return value

        user = request.user

        for tag in value:
            if tag.user != user:
                raise serializers.ValidationError(
                    "You can only assign your own tags."
                )
            return value