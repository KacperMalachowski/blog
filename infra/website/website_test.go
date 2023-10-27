package website

import (
	"testing"

	"github.com/kacpermalachowski/personal-blog/infra/pkg/mocks"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/stretchr/testify/assert"
)

func TestNew(t *testing.T) {
	err := pulumi.RunErr(func(ctx *pulumi.Context) error {
		_, err := New(ctx, "EU", "xxsdfhsfkashadf", "kacpermalachowski/blog")
		return err
	}, pulumi.WithMocks("project", "stack", mocks.New(0)))

	assert.NoError(t, err)
}
